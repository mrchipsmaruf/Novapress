import React, { useMemo, useState } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosSecure from "../../../Services/axiosSecure";

export default function MyIssues() {
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["myIssues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/my/${user.email}`);
      return res.data;
    }
  });


  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const categories = ["all", "Road", "Electricity", "Water", "Garbage", "Footpath", "Drainage", "Other"];
  const statuses = ["all", "pending", "in-progress", "working", "resolved", "closed"];

  const filteredIssues = useMemo(() => {
    return (issues || []).filter(issue => {
      if (statusFilter !== "all" && issue.status !== statusFilter) return false;
      if (categoryFilter !== "all" && issue.category !== categoryFilter) return false;
      return true;
    });
  }, [issues, statusFilter, categoryFilter]);

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/issues/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myIssues", user?.email]);
    }
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return axiosSecure.patch(`/issues/edit/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myIssues", user?.email]);
      Swal.fire({ icon: "success", title: "Updated", text: "Issue updated successfully." });
      closeEditModal();
    },
    onError: (err) => {
      Swal.fire({ icon: "error", title: "Error", text: err?.message || "Update failed" });
    }
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const openEditModal = (issue) => {
    setEditingIssue(issue);
    reset({
      title: issue.title,
      description: issue.description,
      category: issue.category,
      location: issue.location
    });
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditingIssue(null);
    reset({});
  };

  const onEditSubmit = async (formData) => {
    if (!editingIssue) return;
    if (editingIssue.status !== "pending") {
      Swal.fire("Cannot edit", "Only pending issues can be edited.", "warning");
      return;
    }
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
    };
    editMutation.mutate({ id: editingIssue._id, data: payload });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this issue?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your issue has been deleted.", "success");
          },
          onError: (err) => {
            Swal.fire("Error", err?.message || "Delete failed", "error");
          }
        });
      }
    });
  };

  if (isLoading) return <div className="p-5 text-center">Loading your issues...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">My Reported Issues</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select select-bordered">
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="select select-bordered">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="ml-auto">
          <button onClick={() => { setStatusFilter("all"); setCategoryFilter("all"); }} className="btn btn-ghost">Clear</button>
        </div>
      </div>

      {filteredIssues.length === 0 ? (
        <p className="text-gray-600">You have no issues matching that filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredIssues.map((issue) => (
            <div key={issue._id} className="border rounded-lg p-4 shadow-sm">

              {/* Image */}
              {issue.image && (
                <img src={issue.image} alt={issue.title} className="w-full h-40 object-cover rounded mb-3" />
              )}

              {/* Title */}
              <h3 className="font-bold text-lg mb-1">{issue.title}</h3>

              {/* Category */}
              <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {issue.category}</p>

              {/* Status */}
              <p className="text-sm mb-1">
                <strong>Status:</strong>{" "}
                <span className={`px-2 py-1 rounded text-white text-xs ${issue.status === "pending" ? "bg-yellow-500"
                  : issue.status === "in-progress" ? "bg-blue-500"
                    : "bg-green-600"}`}>
                  {issue.status}
                </span>
              </p>

              {/* Date */}
              <p className="text-xs text-gray-500">
                {new Date(issue.reportedAt).toLocaleString()}
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-3">
                <Link to={`/dashboard/issue/${issue._id}`} className="btn btn-sm btn-primary">View Details</Link>

                <div className="flex gap-2">
                  {/* Edit button: only shown if pending */}
                  {issue.status === "pending" && (
                    <button onClick={() => openEditModal(issue)} className="btn btn-sm btn-outline">Edit</button>
                  )}

                  {/* Delete */}
                  {issue.status === "pending" && (
                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="btn btn-sm btn-error text-white">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/*Edit Modal*/}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Edit Issue</h3>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input {...register("title", { required: true })} className="input input-bordered w-full" />
                {errors.title && <p className="text-red-500 text-sm">Title required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" rows={4} />
                {errors.description && <p className="text-red-500 text-sm">Description required</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">Category</label>
                  <select {...register("category", { required: true })} className="select select-bordered w-full">
                    {categories.filter(c => c !== "all").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Location</label>
                  <input {...register("location", { required: true })} className="input input-bordered w-full" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={closeEditModal} className="btn btn-ghost">Cancel</button>
                <button type="submit" disabled={isSubmitting || editMutation.isLoading} className="btn btn-primary">
                  {editMutation.isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

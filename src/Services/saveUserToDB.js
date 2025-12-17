import axios from "axios";

const saveUserToDB = async (userInfo) => {
    const res = await axios.post(
        "https://novapress-server.vercel.app/users",
        userInfo
    );
    return res.data;
};

export default saveUserToDB;

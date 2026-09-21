
export const isLoggedIn = () => {
    const token = localStorage.getItem("token");

    return !!token;
};



export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
};
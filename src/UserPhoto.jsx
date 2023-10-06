import "./UserPhoto.css"

function UserPhoto({ image, availableStatus }) {
    return (
        <div className="user-image">
            <img src="/user.png"></img>
            <div className="status" style={{ backgroundColor: availableStatus ? "green" : "red" }}></div>
        </div >
    );
}

export default UserPhoto;
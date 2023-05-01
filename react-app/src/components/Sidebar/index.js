import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateClassModal from "../CreateClassModal";
import "./Sidebar.css"
import { useSelector } from "react-redux";

const Sidebar = () => {
    const history = useHistory()
    const params = useParams()

    const session = useSelector(state => state?.session)
    const userRelatedClasses = session?.user?.learning

    const swapClass = (c) => {
        history.push(`/dashboard/classes/${c?.class_id}`)
    }

    return (
        <>
            <div className="dashboard-side-bar">
                <div className="dashboard-side-bar-top">
                    <div className="user-icon-container">
                        <i onClick={() => history.push("/")} className="dashboard-logo-icon fa-solid fa-robot fa-2xl" />
                        <i onClick={() => history.push(`/profiles/${session?.user?.id}`)} className="fa-regular fa-circle-user fa-2xl" />
                        <OpenModalButton
                            modalComponent={<CreateClassModal props={[session?.user?.id]} />}
                            buttonText={<i className="fa-solid fa-circle-plus fa-xl" />}
                        />
                    </div>
                    <div id="user-classes-list">
                        {userRelatedClasses && userRelatedClasses.map((c, idx) => (
                            <div className={`class-image-container ${parseInt(params?.classId) === c?.class_id && "selected"}`} onClick={() => swapClass(c)} key={`made ${idx}`}>
                                <img className="dashboard-class" src={c?.class_info?.image} alt="class" ></img>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dashboard-side-bar-bottom">
                    <i className="fa-solid fa-magnifying-glass fa-lg" onClick={() => history.push("/classes")} />
                </div>
            </div>
            <div id="sidebar-space"></div>
        </>
    )
}

export default Sidebar

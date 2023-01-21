import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom";
import { deleteGroupThunk, getGroup } from "../../store/groups";
import './OneGroup.css'
import EditGroupModal from "../EditGroup";
import CreateEventModal from "../CreateEvent";
import OpenModalButton from "../OpenModalButton";
import { deleteEventThunk, loadEvents } from "../../store/events";

export default function OneGroupPage (){
  const dispatch = useDispatch();
  const history = useHistory();
  const {groupId} = useParams();
  const eventsObj = useSelector(state => state.events.allEvents)
  const events = Object.values(eventsObj)

  useEffect(() => {
		dispatch(getGroup(groupId));
	}, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteGroupThunk(groupId))
    .then(async () => {
      history.push('/groups')
    })
  }

  const currentGroup = useSelector(state => state.groups.group)
  const currentUser = useSelector((state) => state.session.user)

  if (!currentGroup.GroupImages) return;

  let isOrganizer = false

  if (currentUser) {
    isOrganizer = currentGroup.organizerId === currentUser.id
  }

  if (currentGroup.numMembers === 0) currentGroup.numMembers = 1

  const groupInfo = currentGroup ? (
    <div className="one-group-container">
      {/* <Link to='/groups'><button className='back-btn'>&laquo; Back</button></Link> */}
      <div className='image-container'>
        <img
            className='group-image'
            alt={`${currentGroup.name}'s preview`}
            src={currentGroup.GroupImages.length > 0 ?
                `${currentGroup.GroupImages[0].url}`
                : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              }
        />
      </div>
      <div className='one-group-description'>
        <h2 className='one-group-name'>{currentGroup.name}</h2>
        <h2 className='one-group-location'>{`${currentGroup.city}, ${currentGroup.state}`}</h2>
      </div>
      <div>
        <p className='one-group-about'>{currentGroup.about}</p>
        <p className='one-group-info-members'>{
          `${currentGroup.numMembers} ${currentGroup.numMembers > 1 ? "members" : "member"} `}&#x2022;
           {currentGroup.private ? " Private" : " Public"}
        </p>
      </div>
      <div>
        {isOrganizer && (
        <div className="user-actions">
          <OpenModalButton
          buttonText="Edit Group"
          modalComponent={<EditGroupModal group={currentGroup} />}
          />
          <OpenModalButton
          buttonText="Create An Event"
          modalComponent={<CreateEventModal group={currentGroup} />}
          />
          <button onClick={handleDelete}>
            Delete Group
          </button>
        </div>
          )}
      </div>
    </div>
  ) : (<h1>Loading group details...</h1>)
  return groupInfo;
}

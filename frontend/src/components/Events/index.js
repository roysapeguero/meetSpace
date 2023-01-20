import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import './Events.css';

const Events = () => {
  const dispatch = useDispatch()
  const eventsObj = useSelector(state => state.events.allEvents)
  const events = Object.values(eventsObj)

  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false)
  const redirectOneEventPage = eventId => history.push(`/events/${eventId}`)

  useEffect(() => {
    dispatch(getEvents()).then(() =>{
      setIsLoaded(true)
    })
  }, [dispatch])

  const handleEventClick = (eventId) => {
    redirectOneEventPage(eventId)
  }

  if (!events) return null


  const eventInfo = events.map((event) => {
    const dMD = new Date(event.startDate).toDateString().split(' ')
    const newStartDateTime = new Date(event.startDate).toLocaleTimeString()
    return (
      <div onClick={() => handleEventClick(event.id)} key = {event.id} className="event-container">
        <hr />
        <div className='img-container'>
          <img
            className='preview-img'
            src={event.previewImage === 'No images yet' ?
              "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              : event.previewImage}
            alt={`${event.name}'s preview`}
          />
        </div>
        <div className='event-description'>
          <p className='event-name'>{event.name}</p>
          <p className='event-dates'>{`${dMD[0].toUpperCase()}, ${dMD[1].toUpperCase()} ${dMD[2]} - ${newStartDateTime}`}</p>
        </div>
        <div>
          <p className='event-group-name-location'> {`${event.Group.name}`}&#x2022; {`${event.Group.city}, ${event.Group.state}`}</p>
          <p className='event-info-members'>{`${event.numAttending} ${event.numAttending > 1 ? "attendees" : "attendant"} `}</p>
          <p className='event-type'>{`${event.type} Event`}</p>
        </div>
      </div>
      );
    })

  return <div className="event-list-container">{eventInfo}</div>;
};

export default Events;

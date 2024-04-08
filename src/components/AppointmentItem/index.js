// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavourite} = props
  const {id, titleInput, dateInput, isFavourite} = appointmentDetails

  const onClickStarStatus = () => {
    toggleIsFavourite(id)
  }

  const starButtonIsActive = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-card">
      <div className="card3">
        <p>{titleInput}</p>
        <button
          onClick={onClickStarStatus}
          type="button"
          className="star-btn"
          data-testid="star"
        >
          <img src={starButtonIsActive} className="star-img" alt="star" />
        </button>
      </div>
      <p>Date: {dateInput}</p>
    </li>
  )
}

export default AppointmentItem

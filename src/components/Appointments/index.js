// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

// doubt3 = how to create button functionality in starred
// if click button only favourite stars only has to
// appointmentItem only has to display

class Appointments extends Component {
  state = {
    listOfAppointments: [],
    titleInput: '',
    dateInput: '',
    starredBtn2Status: false,
  }

  // doubt2 = how to write a isFavourite struggling
  toggleIsFavourite = id => {
    this.setState(prevState => ({
      listOfAppointments: prevState.listOfAppointments.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isFavourite: !prevState.isFavourite}
        }
        return eachApp
      }),
    }))
  }

  // 3 if you click on starred button status has to change
  // mistake1 if you click on button important appointments has to display that functionality implemented here
  onClickStarredBtn = () => {
    this.setState(prevState => ({
      starredBtn2Status: !prevState.starredBtn2Status,
    }))
  }

  onAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppoint = {
      id: v4(),
      titleInput,
      dateInput: formattedDate,
      isFavourite: false,
    }

    // 1 doubt= how to write setState i am struggling
    this.setState(prevState => ({
      listOfAppointments: [...prevState.listOfAppointments, newAppoint],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointments = () => {
    const {starredBtn2Status, listOfAppointments} = this.state
    if (starredBtn2Status === true) {
      const importantAppointments = listOfAppointments.filter(
        eachAppoint => eachAppoint.isFavourite === true,
      )
      return importantAppointments
    }
    return listOfAppointments
  }

  render() {
    const {titleInput, dateInput, starredBtn2Status} = this.state
    const isActive1 = starredBtn2Status ? 'active-btn' : 'inActive-btn'

    const filteredData = this.getFilteredAppointments()

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="card1">
            <form className="form-control" onSubmit={this.onAdd}>
              <h1>Add Appointment</h1>
              <label htmlFor="titleId">TITLE</label>
              <input
                id="titleId"
                type="text"
                className="title-input"
                placeholder="Title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="dateId">DATE</label>
              <input
                id="dateId"
                type="date"
                className="date-input"
                value={dateInput}
                onChange={this.onChangeDateInput}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointments-img"
              alt="appointments img"
            />
          </div>

          <hr className="line" />

          <div className="card2">
            <h1>Appointments</h1>
            <button
              onClick={this.onClickStarredBtn}
              type="button"
              className={`starred-btn   ${isActive1}`}
            >
              Starred
            </button>
          </div>

          <ul className="list-container">
            {filteredData.map(eachApp => (
              <AppointmentItem
                key={eachApp.id}
                appointmentDetails={eachApp}
                toggleIsFavourite={this.toggleIsFavourite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

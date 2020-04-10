import React, { Component } from 'react';

class DayCard extends Component {
  constructor(props) {
    super(props);
    this.state = {       

    }
  }



   convertKelvinToCelsius = (kelvin) => {
    let result;
    kelvin < 0 ? result = false: result = Math.ceil(kelvin-273.15);
    return result;
    
  }

  renderImages = (region) => {

  }

  render() {
    // console.log(this.props.data)
    return (
      <div>
          <div className='image-holder'>
            <div>{this.props.data.name}</div>
            <img src={'http://openweathermap.org/img/w/' + this.props.data.weather[0].icon + ".png"} alt=''></img>
            <div>{this.convertKelvinToCelsius(this.props.data.main.temp)} C</div>
          </div>
      </div>
    );
  }
}
 
export default DayCard;
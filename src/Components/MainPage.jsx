import React, { Component } from 'react';
import DayCard from './DayCard';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedRegions: ['Ankara'],
      regionData: [],
      apiKey: '76fb9909db34632ee3aa871e862fd196',
     }
  }

  componentDidMount() {
    if(this.state.selectedRegions.length > 0)
    this.state.selectedRegions.forEach(element => {
      this.fetchDataCurrent('https://api.openweathermap.org/data/2.5/weather',element, this.state.apiKey);
      this.fetchDataWeekly('https://api.openweathermap.org/data/2.5/forecast/daily', element,7,this.state.apiKey); 
    });
  }

  fetchDataCurrent = (url,city,key) => {

    const searchURL = url + '?q=' + city + '&appid=' + key;

    fetch(searchURL)
    .then(response => response.json())
    .then(data => {
      const newRegionData = [...this.state.regionData, data]
      this.setState({
        regionData: newRegionData,
      });
    });
  }

  fetchDataWeekly = (url,city,cnt,key) => {
    const searchURL = url + '?q=' + city + '&cnt=' + cnt + '&appid=' + key;

    fetch(searchURL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({

      });
    });
  }

  selectCountry (val) {
    this.setState({ country: val });
  }
 
  selectRegion (val) {
    const newSelectedRegions = [...this.state.selectedRegions, val];
    this.fetchDataCurrent('https://api.openweathermap.org/data/2.5/weather',val, this.state.apiKey);  
    this.setState({ 
      selectedRegions: newSelectedRegions,
      region: val,
     });
  }

  renderCards = () => {
    return this.state.regionData.map( (data) => {
      if(data != null){
        return (
          <div className='image-holder'>
            <DayCard data={data} name={data.name} temperature={data.main.temp} src={data.weather[0].icon} alt=''></DayCard>
          </div>
          );
        }
        return <div>No data found to show</div>;
      });
  }

  render() {
    const images = this.renderCards();
    const { country, region } = this.state; 
    return (
      <div>
      <CountryDropdown
        value={country}
        onChange={(val) => this.selectCountry(val)} />
      <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => this.selectRegion(val)} />
        {images}
    </div>
    );
  }
}
 
export default MainPage;
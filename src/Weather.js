import React, { Component } from 'react'

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'f470db8eb879db082bb4fa118ebdf300';

export default class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: 0,
            wind_speed: 0,
            wind_direction: 0,
            description: '',
            icon: ''
        }
    }

    componentDidMount() {
        // muodostaa osoitteen
        const url = apiUrl + 
            'lat=' + this.props.lat +
            '&lon=' + this.props.lng +
            '&units=metric' + 
            '&appid=' + apiKey;

        // hakee tiedot
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({
                    temp: result.main.temp,
                    wind_speed: result.wind.speed,
                    wind_direction: result.wind.deg,
                    description: result.weather[0].description,
                    icon: result.weather[0].icon
                })
            },
            (error) => {
                alert(error);
            }
        )
    }


    render() {
        const {temp, wind_speed, wind_direction, description, icon} = this.state;
        const icon_url = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
        console.log(icon_url);

        return (
            <div>
                <h3>Weather at your location</h3>
                <p>{temp} C&#176; </p>
                <p>{wind_speed} m/s {wind_direction} degrees</p>
                <p>{description}</p>
                <img src={icon_url} />
            </div>
        )
    }
}

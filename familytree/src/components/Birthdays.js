import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export class Birthdays extends Component {

    constructor(props) {
        super(props)
        this.state = {
            upcomingBirthdayMembers :[],
            recentBirthdayMembers :[],
            upcomingDays:30,
            recentDays :30,
            backendUrl : "http://34.228.52.192:8080/familytree/"
        }
    };

    componentDidMount() {
        this.fetchBirthdayMembers(30, true);
        this.fetchBirthdayMembers(30, false);
      };

      fetchBirthdayMembers (days, upcoming) {
        axios.get(`${this.state.backendUrl}member/birthdays?days=${days}&upcoming=${upcoming}`)
          .then(response => {
            console.log(response.data);
            if(upcoming){
                this.setState({upcomingBirthdayMembers:response.data})
            }else{
                this.setState({recentBirthdayMembers:response.data})
            }
          }).catch(error =>{
              console.log(error);
          });
      }


    render() {
        return (
            <div>
                <div className="upcoming">
                    <h3 style={{display:'inline-block'}}>Upcoming Birthdays</h3>
                    <div style={{display:'inline-block'}}>
                        <input style={{marginLeft: 1 + 'em', maxWidth:3 + 'em'}} type='number' value={this.state.upcomingDays} onChange={(event) => { this.setState({upcomingDays: event.target.value}) }}/> days
                        <span style={{paddingLeft: 1 + 'em'}}><FontAwesomeIcon icon={faSearch} onClick={() =>this.fetchBirthdayMembers(this.state.upcomingDays, true)}/></span>
                    </div>
                    {this.state.upcomingBirthdayMembers.map(member => (
                        <div key={member.id}>
                            <Link to={`/familytree/members/${member.id}`}>After {this.state.upcomingDays - member.diffBirthDays + 1} Days, {member.firstName} {member.lastName} : {member.dateOfBirth}</Link>
                        </div>
                    ))}
                </div>
                <div className="recent">
                    <h3 style={{display:'inline-block'}}>Recent Birthdays</h3>
                    <div style={{display:'inline-block'}}>
                        <input style={{marginLeft: 1 + 'em', maxWidth:3 + 'em'}} type='number' value={this.state.recentDays} onChange={(event) => { this.setState({recentDays: event.target.value}) }}/> days
                        <span style={{paddingLeft: 1 + 'em'}}><FontAwesomeIcon icon={faSearch} onClick={() =>this.fetchBirthdayMembers(this.state.recentDays, false)}/></span>
                    </div>
                    {this.state.recentBirthdayMembers.map(member => (
                        <div key={member.id}><Link to={`/familytree/members/${member.id}`}>Before {member.diffBirthDays} Days, {member.firstName} {member.lastName} : {member.dateOfBirth}</Link></div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Birthdays

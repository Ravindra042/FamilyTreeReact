import React, { Component } from 'react'
import axios from 'axios';
import MemberRow from './MemberRow';
import Search from './Search';
import { Link, withRouter } from 'react-router-dom';
class ListMembers extends Component {
    constructor(props) {
        super(props)
        this.state = {
          filterText: '',
          members :[],          
          backendUrl : "http://34.228.52.192:8080/familytree/"
        }
    };

    // update filterText in state when user types 
    filterUpdate(value) {
      console.log(value);
      this.setState({
        filterText: value
      });
    }

    componentDidMount() {
        this.fetchMembers();
      };

      fetchMembers() {
        axios.get(`${this.state.backendUrl}member`)
          .then(response => {
            console.log(response.data);
            this.setState({members:response.data})
          }).catch(error =>{
              console.log(error);
          });
      }
      
      render() {

        const input = this.state.filterText.toLowerCase()
        const {members} = this.state
          return (
              <div>
                <div className="position_relative">
                  <Search
                    filterVal={this.state.filterText}
                    filterUpdate={this.filterUpdate.bind(this)}
                  /> 
                <div>
                  <Link to="/familytree/members/new">NEW</Link>
                </div>
                </div>
                <div>
                  <table className="">
                    <thead>
                      <tr>
                        <th>Nick Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                    {members.filter((member, i) => {
                                        return (member.firstName.toLowerCase().indexOf(input) !== -1 ||
                                                member.lastName.toLowerCase().indexOf(input) !== -1 ||
                                                member.nickName.toLowerCase().indexOf(input) !== -1 ||
                                                member.gender.toLowerCase().indexOf(input) !== -1
                                            )
                                      }).map((member) => {
                               return <MemberRow key={member.id} member={member} ></MemberRow>
                        })}
                    </tbody>
                  </table> 
                </div>
              </div>
          );
        }
}

export default withRouter(ListMembers);
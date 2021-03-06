import React, { Component } from 'react'
import axios from 'axios';
import Member from './Member';
import { config } from './Constants';

class MemberDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {member :{}}
    };

    componentDidMount() {
        this.fetchMember();
      };

      fetchMember () {
        axios.get(`http://34.228.52.192:8080/familytree/member/${this.props.match.params.id}`)
          .then(response => {
            console.log(response.data);
            this.setState({member:response.data})
          }).catch(error =>{
              console.log(error);
          });
      }

     componentDidUpdate(prevProps, prevState) {
       if(prevProps.match.params.id !== this.props.match.params.id){
        this.setState({member:{}})
        this.fetchMember();
       }
     }
     
      
      render() {
        if (!this.state.member.firstName) {
            return null;
          }
          const { member } = this.state;
          return (
              <React.Fragment>
                    <Member member={member} />
              </React.Fragment>
          );
        }
}

export default MemberDetail;

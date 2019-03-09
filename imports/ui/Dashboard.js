import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        Dashboard component
      </div>
    );
  }
};

// export default withTracker(() => {

//   return {
//   };
// })(Dashboard);

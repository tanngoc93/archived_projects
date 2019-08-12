import React from 'react';
import { PersistentDrawer } from './components/PersistentDrawer';

class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <PersistentDrawer>
          {this.props.children}
        </PersistentDrawer>
      </div>
    );
  }
}

export { Header };

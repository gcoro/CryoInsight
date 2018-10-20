import React from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import MapContainer from './components/MapContainer';
import InfoModal from './components/InfoModal';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerIsOpen: false,
      modalIsOpen: false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenDrawer() {
    if (this.state.drawerIsOpen) this.setState({ drawerIsOpen: false });
    else this.setState({ drawerIsOpen: true });
  }

  handleOpenModal(action) {
    if (action === 'close') this.setState({ modalIsOpen: false });
    else this.setState({ modalIsOpen: true });
  }

  createModal() {
    return <InfoModal show={true} />;
  }

  render() {
    return (<>
      <Header handleOpenDrawer={this.handleOpenDrawer.bind(this)} drawerIsOpen={this.state.drawerIsOpen}/>
      {this.state.drawerIsOpen && <Drawer handleOpenModal={this.handleOpenModal} />}
      <MapContainer />
      {this.state.modalIsOpen && this.createModal()}
    </>
    );
  }
}

export default App;

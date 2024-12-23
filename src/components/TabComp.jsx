import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Productscard from '../pages/Productscard';
import Deleteprod from '../pages/Deleteprod';

function JustifiedExample() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="Home">
        <Productscard/>
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Deleteprod/>
      </Tab>
      <Tab eventKey="longer-tab" title="Loooonger Tab">
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default JustifiedExample;
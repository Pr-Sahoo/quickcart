import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Productscard from '../pages/Productscard';
import Deleteprod from '../pages/Deleteprod';
import Page from '../pages/Page';
import CreateProduct from '../pages/Creationprod';
import AllOrders from '../pages/AllOrders';
import AuthPage from '../pages/AuthPage';

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
        <Page/>
      </Tab>
      <Tab eventKey="all-orders" title="All Orders">
        <AllOrders/> 
      </Tab>
      <Tab eventKey="auth-page" title="Auth Page">
        <AuthPage/>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
      <Tab eventKey="create-product" title="crt-product">
        <CreateProduct/>
      </Tab>
    </Tabs>
  );
}

export default JustifiedExample;
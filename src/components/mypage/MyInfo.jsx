import { Collapse } from 'antd';
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const App = () => (
  <Collapse accordion>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
  </Collapse>
);
export default App;

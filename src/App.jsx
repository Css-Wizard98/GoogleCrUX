import './App.css'
import Input from './components/Input/Input';
import Table from './components/Table/Table'

function App() {
  const generateDummyData = () => {
    const data = [];
    for (let i = 1; i <= 5; i++) {
      data.push({
        name: `Name ${i}`,
        age: 20 + i,
        email: `email${i}@example.com`,
        city: `City ${i}`,
      });
    }
    return data;
  };

  const headers = [
    { key: 'name', label: 'Name', minWidth: '150px'},
    { key: 'age', label: 'Age', minWidth: '80px'},
    { key: 'email', label: 'Email', minWidth: '200px'},
    { key: 'city', label: 'City', minWidth: '120px'},
  ];

  const dummyData = generateDummyData();
  console.log(dummyData)
  return (
    <div className="app-container">
      <h1>Ashish</h1>
      <Input/>
      <Table headers={headers} data={dummyData} />
    </div>
  );
}

export default App;


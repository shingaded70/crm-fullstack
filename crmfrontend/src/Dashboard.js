import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const API = "http://127.0.0.1:8080/api";
  const [page, setPage] = useState("dashboard");

  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [sales, setSales] = useState([]);

  const [newCustomer, setNewCustomer] = useState({});
  const [newLead, setNewLead] = useState({});
  const [newTask, setNewTask] = useState({});
  const [newSale, setNewSale] = useState({});

  const loadAll = () => {
    axios.get(API+"/customers").then(r=>setCustomers(r.data));
    axios.get(API+"/leads").then(r=>setLeads(r.data));
    axios.get(API+"/tasks").then(r=>setTasks(r.data));
    axios.get(API+"/sales").then(r=>setSales(r.data));
  };

  useEffect(()=>{ loadAll(); },[]);

  const create=(type,data)=>axios.post(`${API}/${type}`,data).then(loadAll);
  const remove=(type,id)=>axios.delete(`${API}/${type}/${id}`).then(loadAll);

  const totalSales=sales.reduce((s,x)=>s+(Number(x.amount)||0),0);

  const chartData={
    labels:["Customers","Leads","Tasks","Sales"],
    datasets:[{
      data:[
        customers.length,
        leads.length,
        tasks.length,
        sales.length
      ],
      backgroundColor:[
        "#3b82f6",
        "#f59e0b",
        "#8b5cf6",
        "#10b981"
      ]
    }]
  };

  return(
    <div style={styles.container}>

      <div style={styles.sidebar}>
        <h2>CRM</h2>
        <p onClick={()=>setPage("dashboard")}>Dashboard</p>
        <p onClick={()=>setPage("customers")}>Customers</p>
        <p onClick={()=>setPage("leads")}>Leads</p>
        <p onClick={()=>setPage("tasks")}>Tasks</p>
        <p onClick={()=>setPage("sales")}>Sales</p>
      </div>

      <div style={styles.main}>

        {page==="dashboard"&&(
          <>
            <h1>Analytics Dashboard</h1>

            <div style={styles.cards}>
              <div style={styles.card}>Customers: {customers.length}</div>
              <div style={styles.card}>Leads: {leads.length}</div>
              <div style={styles.card}>Tasks: {tasks.length}</div>
              <div style={styles.card}>Revenue: ₹{totalSales}</div>
            </div>

            <div style={styles.charts}>
              <div style={styles.chartBox}><Bar data={chartData}/></div>
              <div style={styles.chartBox}><Pie data={chartData}/></div>
            </div>
          </>
        )}

        {page==="customers"&&(
          <>
            <h1>Customers</h1>

            <div style={styles.form}>
              <input placeholder="Name" onChange={e=>setNewCustomer({...newCustomer,name:e.target.value})}/>
              <input placeholder="Email" onChange={e=>setNewCustomer({...newCustomer,email:e.target.value})}/>
              <input placeholder="Company" onChange={e=>setNewCustomer({...newCustomer,company:e.target.value})}/>
              <button style={styles.button} onClick={()=>create("customers",newCustomer)}>Add</button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c=>(
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.company}</td>
                    <td>
                      <button style={styles.delete}
                        onClick={()=>remove("customers",c.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {page==="leads"&&(
          <>
            <h1>Leads</h1>

            <div style={styles.form}>
              <input placeholder="Name" onChange={e=>setNewLead({...newLead,name:e.target.value})}/>
              <input placeholder="Status" onChange={e=>setNewLead({...newLead,status:e.target.value})}/>
              <button style={styles.button} onClick={()=>create("leads",newLead)}>Add</button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(l=>(
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td>{l.status}</td>
                    <td>
                      <button style={styles.delete}
                        onClick={()=>remove("leads",l.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {page==="tasks"&&(
          <>
            <h1>Tasks</h1>

            <div style={styles.form}>
              <input placeholder="Title" onChange={e=>setNewTask({...newTask,title:e.target.value})}/>
              <input placeholder="Status" onChange={e=>setNewTask({...newTask,status:e.target.value})}/>
              <button style={styles.button} onClick={()=>create("tasks",newTask)}>Add</button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(t=>(
                  <tr key={t.id}>
                    <td>{t.title}</td>
                    <td>{t.status}</td>
                    <td>
                      <button style={styles.delete}
                        onClick={()=>remove("tasks",t.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {page==="sales"&&(
          <>
            <h1>Sales</h1>

            <div style={styles.form}>
              <input placeholder="Amount" onChange={e=>setNewSale({...newSale,amount:e.target.value})}/>
              <input placeholder="Status" onChange={e=>setNewSale({...newSale,status:e.target.value})}/>
              <button style={styles.button} onClick={()=>create("sales",newSale)}>Add</button>
            </div>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(s=>(
                  <tr key={s.id}>
                    <td>₹{s.amount}</td>
                    <td>{s.status}</td>
                    <td>
                      <button style={styles.delete}
                        onClick={()=>remove("sales",s.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

      </div>
    </div>
  );
}

const styles={
  container:{display:"flex",height:"100vh"},
  sidebar:{width:220,background:"#0f172a",color:"white",padding:20,cursor:"pointer"},
  main:{flex:1,padding:30,background:"#f8fafc"},
  cards:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginBottom:40},
  card:{background:"white",padding:30,borderRadius:10},
  charts:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:30},
  chartBox:{background:"white",padding:20,borderRadius:10},
  form:{display:"flex",gap:10,marginBottom:20},
  table:{width:"100%",background:"white",borderCollapse:"collapse"},
  button:{padding:8,background:"#3b82f6",color:"white",border:"none"},
  delete:{background:"red",color:"white",border:"none"}
};

export default Dashboard;

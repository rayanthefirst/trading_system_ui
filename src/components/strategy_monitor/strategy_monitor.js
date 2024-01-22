import './strategy_monitor.css';

const StrategyMonitor = ({strategies, toggleStrategy, deleteStrategy}) => {
 
  return (
    <div className="table-container">
        <table>
        <thead>
            <tr>
            {strategies.length > 0 && Object.keys(strategies[0]).map((key, index) => (
                <th key={index}>{key}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {strategies.map((item, index) => (
            <tr key={index}>
                {Object.values(item).map((value, index) => (
                <td key={index}>{value}</td>
                ))}
                <button onClick={() => toggleStrategy(item.strategy_id, item.strategy_status)}>Turn On/Off</button>
                <button onClick={() => deleteStrategy(item.strategy_id)}>Delete</button>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default StrategyMonitor;

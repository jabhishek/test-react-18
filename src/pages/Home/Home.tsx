import { Link, Outlet } from 'react-router-dom';

const Home = ({ text }: { text: string }) => {
  return (
    <div>
      <Link to={text}>Link to {text}</Link>
      <Outlet />
    </div>
  );
};

export default Home;

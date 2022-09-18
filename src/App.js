import CommentList from './components/CommentList';
import PageList from './components/PageList';
import CommentForm from './components/CommentForm';

const App = () => {
  return (
    <div>
      <main>
        <CommentList />
        <PageList />
      </main>

      <CommentForm />
    </div>
  );
};

export default App;

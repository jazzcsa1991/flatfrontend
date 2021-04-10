import './App.css';
import Home from './components/home'
import Branches from './components/information/branches'
import Commits from './components/information/commits'
import PRList from './components/pull request/pr_list'
import 'bootstrap/dist/css/bootstrap.min.css';
import CommitsDetail from './components/information/detail_commit'
import Create from './components/pull request/create'
import PRBackup from './components/pull request/pr_backup'
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Switch>
          <Route exact path="/" component={Home} />  //ruta de home
          <Route exact path="/branch" component={Branches} />//ruta de todas las ramas de un repo
          <Route exact name="commit" path="/commit" component={Commits} />//ruta de todos los commit de una rama
          <Route exact name="create" path="/create" component={Create} />//ruta para crear un PR
          <Route exact name="pr_list" path="/pr_list" component={PRList} />//ruta de los PR en un repo
          <Route exact name="pr_backup" path="/pr_backup" component={PRBackup} />//ruta de los PR creados mediante API
          <Route exact name="commit_detail" path="/detail" component={CommitsDetail} />//detalle de un commit
        </Switch>
    </BrowserRouter>
  );
}
export default App;

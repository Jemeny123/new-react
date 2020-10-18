import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
/*
    BootstrapUI的使用
        * 安装 npm/cnpm i bootstrap
        * 引入使用

*/

class Boot extends React.Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary">
          Primary
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Boot;

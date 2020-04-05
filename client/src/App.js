import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  state = { url: '', shortenedUrl: '' }


  handleChange = (event) => {
    this.setState({ url: event.target.value });
  }

  handleSubmit = (event) => {
    this.setState({
      shortenedUrl: ''
    })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: this.state.url
    };
    fetch('http://localhost:8080/shorten', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ shortenedUrl: data.shortenedUrl }));
    event.preventDefault();
  }

  copyUrlToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:8080/redirect/${this.state.shortenedUrl}`)
  }

  render() {
    const { shortenedUrl, url } = this.state;
    return (
      <div className="App">
        <main>
          <form onSubmit={this.handleSubmit}>
            <div class="wrapper">
              <input className="urlbox" id="url" type="url" placeholder="Paste Url here" value={url} onChange={this.handleChange} />
              <input class="submit" type="submit" value="Submit" />
            </div>
          </form>
          {shortenedUrl && (<p className="shortenedurl">
            <a href={`http://localhost:8080/redirect/${shortenedUrl}`} target="_blank">http://localhost:8080/redirect/{shortenedUrl}</a>
            <button onClick={this.copyUrlToClipboard} class="copy" type="button">Copy</button>  
          </p>)}
        </main>
      </div>
    );
  }
}
export default App;

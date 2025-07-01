/* this file is automatically created when we create a react app it is mainly used to test the app.js component make sures correctly it doesnt break when changes are made */
/* its a unit test written using jest-a testing framework and react testing library - for testing UI componemts the way users interact */
import { render, screen } from '@testing-library/react';  //This line imports two helper functions from the @testing-library/react package: render: used to render React components into a simulated DOM (like a fake browser environment).screen: provides queries to access elements in that virtual DOM.
import App from './App'; 
test('renders learn react link', () => {  //Defines a test case named "renders learn react link". The test function is registered with the testing framework (like Jest).
  render(<App />); //Renders the App component into a virtual DOM environment (jsdom). Simulates what a browser would do, but in memory only.
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

## Conf details

### Add bootstrap

1. `npm install --save bootstrap`
2. `npm install --save reactstrap react react-dom`
3. **On index.js file add:** `import 'bootstrap/dist/css/bootstrap.min.css';`

### Add icons

1. `npm install react-icons --save`
2. Usage: 
    `import { FaBeer } from 'react-icons/fa';`

    `class Question extends React.Component {`
        `render() {`
            `return <div> <FaBeer /> </div>`
        `}`
    `}`

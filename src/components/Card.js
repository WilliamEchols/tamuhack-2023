import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardFile({title, text, onSubmitFunction, option1Text, option2Text, option1, option2}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Button variant="primary" onSubmit={onSubmitFunction(option1)}>{option1Text}</Button>
        <Button variant="primary" onSubmit={onSubmitFunction(option2)}>{option2Text}</Button>
      </Card.Body>
    </Card>
  );
}

export default CardFile;
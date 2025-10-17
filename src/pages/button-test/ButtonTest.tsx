import React from 'react';
import { Button } from '../../lib/base-componente';

const ButtonTest: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-content-default mb-8">
        Button Component Test
      </h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-content-default mb-4">
            Solid Variants
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="solid" color="primary" onClick={handleClick}>
              Primary
            </Button>
            <Button variant="solid" color="secondary" onClick={handleClick}>
              Secondary
            </Button>
            <Button variant="solid" color="positive" onClick={handleClick}>
              Positive
            </Button>
            <Button variant="solid" color="negative" onClick={handleClick}>
              Negative
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={handleClick}
              disabled
            >
              Disabled
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-content-default mb-4">
            Outline Variants
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="outline" color="primary" onClick={handleClick}>
              Primary
            </Button>
            <Button variant="outline" color="secondary" onClick={handleClick}>
              Secondary
            </Button>
            <Button variant="outline" color="positive" onClick={handleClick}>
              Positive
            </Button>
            <Button variant="outline" color="negative" onClick={handleClick}>
              Negative
            </Button>
            <Button
              variant="outline"
              color="primary"
              onClick={handleClick}
              disabled
            >
              Disabled
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-content-default mb-4">
            Text Variants
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button variant="text" color="primary" onClick={handleClick}>
              Primary
            </Button>
            <Button variant="text" color="secondary" onClick={handleClick}>
              Secondary
            </Button>
            <Button variant="text" color="positive" onClick={handleClick}>
              Positive
            </Button>
            <Button variant="text" color="negative" onClick={handleClick}>
              Negative
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={handleClick}
              disabled
            >
              Disabled
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-content-default mb-4">
            Keyboard Navigation Test
          </h2>
          <p className="text-content-default mb-4">
            Use Tab to navigate between buttons and Enter/Space to activate
            them. Focus ring should be visible with the custom focus color.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonTest;

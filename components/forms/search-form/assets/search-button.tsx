import React from 'react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';

export const SearchButton = React.memo(({isDisabled}: {isDisabled: boolean}) => (
  <Button disabled={isDisabled} type="submit" className="bg-d-button hover:bg-d-button-hover transition w-fit self-center">
    <FontAwesomeIcon icon={faMagnifyingGlass} />
    Search
  </Button>
));
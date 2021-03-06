// declarations - [{ situations, reactions, reactionsElse, ...etc }]
// declarationObject - { situations, reactions, reactionsElse, ...etc }

import evaluateSituations from './situations/evaluateSituations';
import executeHooks from '../middlewares/executeHooks';
import { DECLARATION_TRIGGERED } from '../middlewares/hookTypes';

export default ({
  declarationObject,
  prevState,
  hasChange,
  eventKey,
  payload,
  ctx
}) => {
  const {
    unparsed,
    situations,
    reducers,
    reducersElse,
    reactions,
    reactionsElse
  } = declarationObject;

  executeHooks(
    { ctx, id: DECLARATION_TRIGGERED },
    { ctx, eventKey, payload, unparsed }
  );

  const situationHolds = evaluateSituations({
    situations,
    prevState,
    hasChange,
    eventKey,
    payload,
    ctx
  });

  return {
    reducers: situationHolds ? reducers : reducersElse,
    reactions: situationHolds ? reactions : reactionsElse
  };
};

import global from '../ctx';

import defaultOptions from '../config/broadcastDefaults';
import executeHooks from '../middlewares/executeHooks';
import invokeDeclaration from '../declarations/invokeDeclaration';
import { ON_EVENT } from '../config/constants';
import { BEFORE_BROADCAST, AFTER_BROADCAST } from '../middlewares/hookTypes';

const broadcast = ({ ctx, eventKey, payload }) => {
  const declarations = ctx[ON_EVENT][eventKey] || [];
  executeHooks({ ctx, id: BEFORE_BROADCAST }, { ctx, eventKey, payload });
  invokeDeclaration({ declarations, eventKey, payload, ctx });
  executeHooks({ ctx, id: AFTER_BROADCAST }, { ctx, eventKey, payload });
};

export const _broadcast = ctx => (eventKey, payload, options = {}) => {
  const useCtx = ctx || global.ctx;
  const opts = Object.assign(defaultOptions, options);
  if (opts.defer) {
    setTimeout(() =>
      broadcast({
        ctx: useCtx,
        options: opts,
        eventKey,
        payload
      })
    );
  } else {
    broadcast({
      ctx: useCtx,
      options: opts,
      eventKey,
      payload
    });
  }
};

export default _broadcast(null);

/** @format */

export const PAGE_LIFECYCLES = {
  pageShow: 'pageShow',
  beforeEnter: 'beforeEnter',
  create: 'create',
  mounted: 'mounted',
  pageHide: 'pageHide',
  beforeLeave: 'beforeLeave',
};

export const EVENT_IDENTIFIER_ENUM = {
  once: 'once',
  replace: 'replace',
  list: 'list',
};

export const EVENT_NAMESPACE_SPLIT_SYMBOL = ':';

export const EVENT_TYPE_SPLIT_SYMBOL = '/';

export const EVENT_IDENTIFIER_SYMBOL = '.';

export const DELAY_TRIGGER_ALL = 'delay_trigger_all';

export const EVENT_NAMESPACE_DEFALUT = 'namespace_default';

export const EVENT_TYPE_DEFAULT = 'type_default';

export const EVENT_IDENTIFIER_DEFAULT = EVENT_IDENTIFIER_ENUM.list;

export const PAGE_SHOW_CACHE_NAMESPACE = 'fromCache';

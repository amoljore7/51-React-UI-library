import { statusTypes } from './constants';

/**
 * Britive's status vocabulary, mapped onto the five semantic badge types.
 * It lives here rather than in each app because `ui-tenant-portal` and
 * `secmgr-frontend-ui` render the same statuses and must colour them the same
 * way; two copies would drift the first time a new status value appeared.
 *
 * Keys are normalised (case, underscores, hyphens, camelCase) because the same
 * concept arrives as `TIMED_OUT`, `Timed Out`, `timed-out` and `timedOut`
 * depending on the endpoint.
 */
const statusTypeByValue = {
  success: statusTypes.success,
  successful: statusTypes.success,
  succeeded: statusTypes.success,
  active: statusTypes.success,
  enabled: statusTypes.success,
  approved: statusTypes.success,
  connected: statusTypes.success,
  completed: statusTypes.success,
  complete: statusTypes.success,
  onboarded: statusTypes.success,
  available: statusTypes.success,
  provisioned: statusTypes.success,
  passed: statusTypes.success,
  verified: statusTypes.success,
  resolved: statusTypes.success,
  valid: statusTypes.success,
  'request approved': statusTypes.success,
  'check out failed': statusTypes.error,
  'check in failed': statusTypes.error,
  failed: statusTypes.error,
  failure: statusTypes.error,
  error: statusTypes.error,
  rejected: statusTypes.error,
  denied: statusTypes.error,
  revoked: statusTypes.error,
  expired: statusTypes.error,
  disconnected: statusTypes.error,
  deleted: statusTypes.error,
  invalid: statusTypes.error,
  unauthorized: statusTypes.error,
  unresolved: statusTypes.error,
  // Profile checkout vocabulary (constants/myProfile's PROFILE_STATUS): a
  // profile awaiting approval or locked by someone else is actionable but not
  // broken, so it warns rather than errors.
  'approval required': statusTypes.warning,
  restricted: statusTypes.warning,
  'check out timed out': statusTypes.warning,
  'check in timed out': statusTypes.warning,
  'timed out': statusTypes.warning,
  timeout: statusTypes.warning,
  warning: statusTypes.warning,
  partial: statusTypes.warning,
  'partially completed': statusTypes.warning,
  expiring: statusTypes.warning,
  'expiring soon': statusTypes.warning,
  stale: statusTypes.warning,
  // Scan-diff vocabulary (New/Updated/Unchanged/Deleted): a scan result is not
  // pass/fail, it reports what changed, so a change is informational and only
  // a disappearance is an error.
  updated: statusTypes.info,
  changed: statusTypes.info,
  modified: statusTypes.info,
  added: statusTypes.info,
  removed: statusTypes.error,
  'check out submitted': statusTypes.info,
  'check in submitted': statusTypes.info,
  'check out in progress': statusTypes.info,
  'check in in progress': statusTypes.info,
  'approval pending': statusTypes.info,
  pending: statusTypes.info,
  'in progress': statusTypes.info,
  'in-progress': statusTypes.info,
  running: statusTypes.info,
  queued: statusTypes.info,
  requested: statusTypes.info,
  scheduled: statusTypes.info,
  submitted: statusTypes.info,
  processing: statusTypes.info,
  new: statusTypes.info,
  // Listed explicitly rather than left to the fallback: these are known,
  // deliberately-neutral states, not unrecognised values.
  // Checked out is a neutral, expected state of a profile — not an outcome to
  // celebrate — so it reads grey rather than green.
  'checked out': statusTypes.general,
  draft: statusTypes.general,
  inactive: statusTypes.general,
  disabled: statusTypes.general,
  unknown: statusTypes.general,
  'not scanned': statusTypes.general,
  unchanged: statusTypes.general,
  never: statusTypes.general,
  none: statusTypes.general,
  // A user withdrawing or cancelling their own request is a neutral outcome,
  // not a failure — it must not read the same as a rejection.
  cancelled: statusTypes.general,
  canceled: statusTypes.general,
  withdrawn: statusTypes.general,
  'request withdrawn': statusTypes.general,
  'n/a': statusTypes.general
};

/**
 * An unrecognised value resolves to `general` — the neutral grey — because
 * guessing wrong would paint a failure green.
 */
export const getStatusType = value => {
  var _statusTypeByValue$ke;
  if (value === null || value === undefined) {
    return statusTypes.general;
  }
  const key = String(value).trim()
  // camelCase and PascalCase first, before the lowercasing destroys the
  // boundary: these endpoints return `checkedOut` and `InProgress` as often
  // as they return `CHECKED_OUT`. An acronym run splits into single letters
  // and simply fails to match, which is the same `general` fallback an
  // unrecognised value already gets.
  .replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  return (_statusTypeByValue$ke = statusTypeByValue[key]) !== null && _statusTypeByValue$ke !== void 0 ? _statusTypeByValue$ke : statusTypes.general;
};
export const getBooleanStatusType = value => value ? statusTypes.success : statusTypes.general;
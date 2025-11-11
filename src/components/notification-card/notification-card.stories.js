import NotificationCard from './notification-card';

export default {
  title: 'design-components/NotificationCard',
  component: NotificationCard,
};

export const NotificationCardDemo = () => {
  // NOTE: Notification Card with notificationMessage as a prop will require the jsx element
  //       wrapped inside the `span` tag ONLY and no other tags because if passed suppose `p` tag,
  //       then it will come up with its own margin and hence can break the style of notification card.
  //       We can Look at the below example for better understanding of it.
  //       Regarding the notificationTime, it will be ONLY passed as a `UTC Date string` format.

  const removeHandler = () => {
    console.log('Remove Button Clicked!');
  };

  const notificationMessage = <span>Your Request for Edit Access for secret ABC is approved.</span>;

  return (
    <div style={{ width: '446px' }}>
      <NotificationCard
        notificationTitle="Secrets Manager"
        notificationTime={new Date().toUTCString()}
        notificationMessage={notificationMessage}
        primaryActionLabel={'Remove'}
        primaryActionHandler={removeHandler}
      />
    </div>
  );
};

export const WithAdditionalActions = () => {
  // NOTE: Notification Card with notificationMessage as a prop will require the jsx element
  //       wrapped inside the `span` tag ONLY and no other tags because if passed suppose `p` tag,
  //       then it will come up with its own margin and hence can break the style of notification card.
  //       We can Look at the below example for better understanding of it.
  //       Regarding the notificationTime, it will be ONLY passed as a `UTC Date string` format.

  const removeHandler = () => {
    console.log('Remove Button Clicked!');
  };

  const requestHandler = () => {
    console.log('Secondary Button Clicked!');
  };

  const notificationMessage = <span>Your Request for Edit Access for secret ABC is approved.</span>;
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  return (
    <div style={{ width: '446px' }}>
      <NotificationCard
        notificationTitle="Secrets Manager"
        notificationTime={yesterdayDate.toUTCString()}
        notificationMessage={notificationMessage}
        primaryActionLabel={'Remove'}
        primaryActionHandler={removeHandler}
        secondaryActionLabel={'Review Request'}
        secondaryActionHandler={requestHandler}
      />
    </div>
  );
};

export const WithTextOverflow = () => {
  // NOTE: Notification Card with notificationMessage as a prop will require the jsx element
  //       wrapped inside the `span` tag ONLY and no other tags because if passed suppose `p` tag,
  //       then it will come up with its own margin and hence can break the style of notification card.
  //       We can Look at the below example for better understanding of it.
  //       Regarding the notificationTime, it will be ONLY passed as a `UTC Date string` format.

  const removeHandler = () => {
    console.log('Remove Button Clicked!');
  };

  const requestHandler = () => {
    console.log('Secondary Button Clicked!');
  };

  const notificationMessage = (
    <span>
      Your Request for Edit Access for secret /Britive_2021/Britive/Apps/Dev/MySQL_DB is approved by
      Robert.
    </span>
  );

  return (
    <div style={{ width: '446px' }}>
      <NotificationCard
        notificationTitle="Secrets Manager"
        notificationTime={new Date(2021, 7, 4).toUTCString()}
        notificationMessage={notificationMessage}
        primaryActionLabel={'Remove'}
        primaryActionHandler={removeHandler}
        secondaryActionLabel={'Review Request'}
        secondaryActionHandler={requestHandler}
      />
    </div>
  );
};

export const NotificationCardWithOverlaySpinner = () => {
  // NOTE: Regarding the notificationTime, it will be ONLY passed as a `UTC Date string` format.

  const removeHandler = () => {
    console.log('Remove Button Clicked!');
  };

  const notificationMessage = 'Your Request for Edit Access for secret ABC is approved.';

  return (
    <div style={{ width: '446px' }}>
      <NotificationCard
        loading={true}
        loadingMessage={'Loading Message...'}
        notificationTitle="Secrets Manager"
        notificationTime={new Date().toUTCString()}
        notificationMessage={notificationMessage}
        primaryActionLabel={'Remove'}
        primaryActionHandler={removeHandler}
      />
      <hr />
      <NotificationCard
        notificationTitle="Secrets Manager"
        notificationTime={new Date().toUTCString()}
        notificationMessage={notificationMessage}
        primaryActionLabel={'Remove'}
        primaryActionHandler={removeHandler}
      />
      <hr />
    </div>
  );
};

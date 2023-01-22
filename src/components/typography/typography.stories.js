import Typography from '.';

export default {
  title: 'design-components/Typography',
  component: Typography,
  argTypes: {
    variant: {
      options: [
        'code1',
        'button',
        'label1',
        'label2',
        'caption1',
        'helper1',
        'pageTitle',
        'pageSectionHeader',
        'body',
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'heading5',
        'heading6',
        'heading7',
      ],
      control: { type: 'radio' },
    },
  },
};

export const TypographyCode = () => {
  const obj = {
    name: 'Mark Fowler',
    friends: [
      {
        id: 0,
        name: 'Dianne Jennings',
      },
      {
        id: 1,
        name: 'Bradshaw Valencia',
      },
      {
        id: 2,
        name: 'Burke Lopez',
      },
    ],
    greeting: 'Hello, Friend!',
    favoriteFruit: 'apple',
  };
  const objstr = JSON.stringify(obj, undefined, 6);
  return (
    <div
      style={{
        backgroundColor: '#a8a8a8',
        width: '400px',
      }}
    >
      <Typography variant="code1">{objstr}</Typography>
    </div>
  );
};

export const TypographyHeading1 = () => {
  return <Typography variant="heading1">1. Heading1</Typography>;
};

export const TypographyHeading2 = () => {
  return <Typography variant="heading2">2. Heading2</Typography>;
};

export const TypographyHeading3 = () => {
  return <Typography variant="heading3">3. Heading3</Typography>;
};

export const TypographyHeading4 = () => {
  return <Typography variant="heading4">4. Heading4</Typography>;
};

export const TypographyHeading5 = () => {
  return <Typography variant="heading5">5. Heading5</Typography>;
};

export const TypographyHeading6 = () => {
  return <Typography variant="heading6">6. Heading6</Typography>;
};

export const TypographyHeading7 = () => {
  return <Typography variant="heading7">7. Heading7</Typography>;
};

export const PageSectionheader = () => {
  return <Typography variant="pageSectionHeader">This is a page section header.</Typography>;
};

export const PageTitle = () => {
  return <Typography variant="pageTitle">This is a page title</Typography>;
};

export const BodyText = () => {
  return (
    <div style={{ width: '600px' }}>
      <Typography variant="body">
        Text in Body : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
        tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate
        numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </div>
  );
};

export const Label1 = () => {
  return <Typography variant="label1">This a label type 1.</Typography>;
};

export const Label2 = () => {
  return <Typography variant="label2">This a label type 2.</Typography>;
};

export const Caption1 = () => {
  return <Typography variant="caption1">This a caption text</Typography>;
};

export const Helper1 = () => {
  return <Typography variant="helper1">This a helper text</Typography>;
};

export const ButtonText = () => {
  return (
    <button>
      <Typography variant="button">Submit Button</Typography>
    </button>
  );
};

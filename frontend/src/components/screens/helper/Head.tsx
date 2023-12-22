import { useEffect } from 'react';

interface HeadComponent {
  title: string;
  description?: string;
}

const Head = (props: HeadComponent) => {
  useEffect(() => {
    document.title = props.title;
    document
      .querySelector("meta[name='description']")
      ?.setAttribute('content', props.description || '');
  }, [props]);

  return <></>;
};

export default Head;

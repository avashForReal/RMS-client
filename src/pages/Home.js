// components
import Page from '../components/Page';
// sections
import {
  HomeHero
} from '../sections/home';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Monke Rule">
      <HomeHero />
    </Page>
  );
}

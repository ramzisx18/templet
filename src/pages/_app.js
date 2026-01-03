import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import 'react-responsive-modal/styles.css';
import './index.scss';
import { store } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../components/seo';
import { fetchTemplates } from '../redux/features/productSlice';
import { fetchCMS } from '../redux/features/cmsSlice';
import { fetchCategories } from '../redux/features/categorySlice';
import { LanguageProvider } from '../context/LanguageContext';

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

// مكون لتحميل البيانات
function DataLoader({ children }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // تحميل البيانات الأساسية
    dispatch(fetchTemplates());
    dispatch(fetchCMS());
    dispatch(fetchCategories());
  }, [dispatch]);
  
  return children;
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEO font={'https://fonts.googleapis.com/css2?family=Be+Vietnam:wght@300;400;500;600;700;800&family=Cairo:wght@300;400;500;600;700&display=swap'} />
      <Provider store={store}>
        <LanguageProvider>
          <DataLoader>
            <Component {...pageProps} />
            <ToastContainer />
          </DataLoader>
        </LanguageProvider>
      </Provider>
    </>
  );
}

export default MyApp;

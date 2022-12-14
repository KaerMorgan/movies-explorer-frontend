import globe from '../../../../images/globe.png';
import './Promo.scss';

const Promo = ({ children }) => {
  return (
    <section className='promo'>
      {children}
      <img src={globe} alt="Планета из слова 'веб'" className='promo__image' />
    </section>
  );
};

export default Promo;

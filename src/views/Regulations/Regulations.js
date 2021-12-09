import React, { useEffect, useState } from 'react';

import Page from '../../components/Page';
import useTombFinance from '../../hooks/useTombFinance';

const Regulations = () => {
  const tombFinance = useTombFinance();
  const [rows, setRows] = useState(null);
  function createData(epoch, dao, dev, masonry, bondsBought, bondsRedeemed) {
    var sum = (Number(dao) + Number(dev) + Number(masonry)).toFixed(2);
    return { epoch, dao, dev, masonry, sum, bondsBought, bondsRedeemed };
  }
  useEffect(() => {
    if (tombFinance) {
      const thisData = tombFinance.listenForRegulationsEvents();
      thisData.then((elements) => {
        setRows(
          elements
            .reverse()
            .map((element) =>
              createData(
                element.epoch,
                element.daoFund,
                element.devFund,
                element.masonryFund,
                element.bondsBought,
                element.bondsRedeemed,
              ),
            ),
        );
      });
    }
  }, [tombFinance]);

  return (
    <Page>
      <div className="flex flex-col mr-0 sm:mr-8 items-center mt-10 mb-10">
        <span className="text-6xl font-Amarante tracking-tighter mb-10">Regulations</span>
        <div className="w-5/6 mx-auto">
          <div className="text-center self-stretch mb-4">
            <div className="tableRow1 grid grid-cols-7 py-4 border border-bright-purple rounded-3xl font-Amarante uppercase text-xl font-light items-center">
              <span>Epoch</span>
              <span>
                Masonry
                <br />
                Funding
              </span>
              <span>
                DAO
                <br />
                Funding
              </span>
              <span>
                Dev
                <br />
                Funding
              </span>
              <span>Total</span>
              <span>
                Bonds
                <br />
                Bought
              </span>
              <span>
                Bonds
                <br />
                Redeemed
              </span>
            </div>
          </div>

          <div className="text-center self-stretch">
            {rows?.map((row, index) => (
              <div
                key={row.epoch}
                className={`${
                  index % 2 == 0 ? 'tableRow1' : 'tableRow2'
                } grid grid-cols-7 font-semibold py-4 border border-bright-purple ${
                  index == 0 ? 'rounded-t-3xl ' : ' '
                } ${index == rows.length - 1 ? 'rounded-b-3xl' : ''}`}
              >
                <span>{row.epoch}</span>
                <span>{row.masonry}</span>
                <span>{row.dao}</span>
                <span>{row.dev}</span>
                <span>{row.sum}</span>
                <span>{row.bondsBought}</span>
                <span>{row.bondsRedeemed}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Regulations;

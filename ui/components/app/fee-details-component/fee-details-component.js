import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AlignItems,
  Display,
  FlexDirection,
  IconColor,
  JustifyContent,
  Size,
  TextVariant,
} from '../../../helpers/constants/design-system';
import {
  BUTTON_VARIANT,
  Box,
  Button,
  IconName,
  Text,
} from '../../component-library';
import TransactionDetailItem from '../transaction-detail-item/transaction-detail-item.component';
import { getIsMultiLayerFeeNetwork, getPreferences } from '../../../selectors';
import { useI18nContext } from '../../../hooks/useI18nContext';
import LoadingHeartBeat from '../../ui/loading-heartbeat';
import UserPreferencedCurrencyDisplay from '../user-preferenced-currency-display/user-preferenced-currency-display.component';
import { PRIMARY, SECONDARY } from '../../../helpers/constants/common';
import { addHexes } from '../../../../shared/modules/conversion.utils';
import fetchEstimatedL1Fee from '../../../helpers/utils/optimism/fetchEstimatedL1Fee';

export default function FeeDetailsComponent({
  txData,
  hexMinimumTransactionFee,
  supportsEIP1559,
  useCurrencyRateCheck,
  shouldShow = true,
}) {
  const [expandFeeDetails, setExpandFeeDetails] = useState(false);
  const [estimatedL1Fees, setEstimatedL1Fees] = useState(null);

  const isMultiLayerFeeNetwork = useSelector(getIsMultiLayerFeeNetwork);
  const { useNativeCurrencyAsPrimaryCurrency } = useSelector(getPreferences);

  const t = useI18nContext();

  useEffect(() => {
    if (isMultiLayerFeeNetwork) {
      fetchEstimatedL1Fee(txData?.chainId, txData)
        .then((result) => {
          setEstimatedL1Fees(result);
        })
        .catch((_err) => {
          setEstimatedL1Fees(null);
        });
    }
  }, [isMultiLayerFeeNetwork, txData]);

  const getTransactionFeeTotal = useMemo(() => {
    if (isMultiLayerFeeNetwork) {
      return addHexes(hexMinimumTransactionFee, estimatedL1Fees || 0);
    }

    return hexMinimumTransactionFee;
  }, [isMultiLayerFeeNetwork, hexMinimumTransactionFee, estimatedL1Fees]);

  const renderTotalDetailText = (value) => {
    return (
      <div className="confirm-page-container-content__total-value">
        <LoadingHeartBeat estimateUsed={txData?.userFeeLevel} />
        <UserPreferencedCurrencyDisplay
          type={SECONDARY}
          key="total-detail-text"
          value={value}
          hideLabel={Boolean(useNativeCurrencyAsPrimaryCurrency)}
        />
      </div>
    );
  };

  const renderTotalDetailTotal = (value) => {
    return (
      <div className="confirm-page-container-content__total-value">
        <LoadingHeartBeat estimateUsed={txData?.userFeeLevel} />
        <UserPreferencedCurrencyDisplay
          type={PRIMARY}
          key="total-detail-value"
          value={value}
          hideLabel={!useNativeCurrencyAsPrimaryCurrency}
        />
      </div>
    );
  };

  return (
    <>
      <Box
        display={Display.Flex}
        alignItems={AlignItems.center}
        justifyContent={JustifyContent.center}
        flexDirection={FlexDirection.Column}
      >
        {supportsEIP1559 && shouldShow && (
          <Box
            padding={4}
            display={Display.Flex}
            alignItems={AlignItems.center}
            justifyContent={JustifyContent.center}
          >
            <Button
              style={{ textDecoration: 'none' }}
              size={Size.Xs}
              variant={BUTTON_VARIANT.LINK}
              endIconName={
                expandFeeDetails ? IconName.ArrowUp : IconName.ArrowDown
              }
              color={IconColor.primaryDefault}
              data-testid="expand-fee-details-button"
              onClick={() => setExpandFeeDetails(!expandFeeDetails)}
            >
              <Text
                variant={TextVariant.bodySm}
                color={IconColor.primaryDefault}
              >
                {t('feeDetails')}
              </Text>
            </Button>
          </Box>
        )}
      </Box>

      {supportsEIP1559 && shouldShow && expandFeeDetails && (
        <Box display={Display.Flex} flexDirection={FlexDirection.Column}>
          <TransactionDetailItem
            detailTitle={t('metamaskFees')}
            detailTotal={renderTotalDetailTotal('0x0')}
            boldHeadings={false}
          />
          {isMultiLayerFeeNetwork && (
            <TransactionDetailItem
              detailTitle={t('optimismFees')}
              detailText={
                useCurrencyRateCheck &&
                renderTotalDetailText(hexMinimumTransactionFee)
              }
              detailTotal={renderTotalDetailTotal(hexMinimumTransactionFee)}
              boldHeadings={false}
            />
          )}
          {isMultiLayerFeeNetwork && estimatedL1Fees && (
            <TransactionDetailItem
              detailTitle={t('layer1Fees')}
              detailText={
                useCurrencyRateCheck && renderTotalDetailText(estimatedL1Fees)
              }
              detailTotal={renderTotalDetailTotal(estimatedL1Fees)}
              boldHeadings={false}
            />
          )}
          <TransactionDetailItem
            detailTitle={t('total')}
            detailText={
              useCurrencyRateCheck &&
              renderTotalDetailText(getTransactionFeeTotal())
            }
            detailTotal={renderTotalDetailTotal(getTransactionFeeTotal())}
          />
        </Box>
      )}
    </>
  );
}

FeeDetailsComponent.propTypes = {
  txData: PropTypes.object,
  hexMinimumTransactionFee: PropTypes.string,
  supportsEIP1559: PropTypes.bool,
  useCurrencyRateCheck: PropTypes.bool,
  shouldShow: PropTypes.bool,
};

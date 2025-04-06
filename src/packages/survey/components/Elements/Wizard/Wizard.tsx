import { FC, Fragment, memo, useCallback, useEffect, useRef } from 'react';
import PagerView from 'react-native-pager-view';

import { IQuestion, IWizardController } from '../../../models/services/survey';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

interface WizardProps {
  controller: IWizardController;
  questions: IQuestion[];
}

const Wizard: FC<WizardProps> = ({ controller, questions }) => {
  const ref = useRef<PagerView>(null);

  useEffect(() => {
      controller.subscribe('index', (index)=> {
          console.log('index');
          console.log(index);
          ref.current?.setPage(index);
      });

  }, [controller]);

  const renderItem = useCallback(
    (question: IQuestion, index: number) => {
      const getLayout = controller.layoutConfig[question.type];

      if (!getLayout) {
        return <></>;
      }

      const frag = <Fragment key={index}>{getLayout(question as never)}</Fragment>;
      return frag;
    },
    [controller.layoutConfig]
  );

  return (
    <PagerView ref={ref} style={styles.root} scrollEnabled={false} initialPage={0}>
      {questions.map(renderItem)}
    </PagerView>
  );
};

export default memo(Wizard);

import { registerTranslations } from '@modules/i18n';

registerTranslations('en', {
    component: {
        startPage: {
            headerTitle: 'React App',
            currentPlaceholder: 'Current value: %(current)s',
            increment: 'Increment',
            decrement: 'Decrement'
        }
    },
    redux: {
        saga: {
            counter: {
                incrementSuccess: 'Successfully incremented.',
                decrementSuccess: 'Successfully decremented.'
            }
        }
    }
});

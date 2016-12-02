'use strict';

// import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Index from 'components/Index/Index';
import DashboardManager from 'components/DashboardManager/DashboardManager';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-grid-layout/node_modules/react-resizable/css/styles.css';
import 'styles/styles.css';

render(<DashboardManager/>, document.getElementById('js-main'));

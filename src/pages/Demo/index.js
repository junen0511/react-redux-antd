import React, { PureComponent } from 'react';
import { Button, Input, Radio, Switch, Checkbox } from 'antd';
import styles from './index.less';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

export default class Demo extends PureComponent {
    state = {
        radioValue: 1
    };
    onChangeRadio = e => {
        this.setState({
            radioValue: e.target.value
        });
    };
    render() {
        return (
            <div className={styles.demoContainer}>
                <div className={styles.blockBox}>
                    <Button className="cm-btn-primary" type="primary">
                        Primary
                    </Button>
                    <Button className="cm-btn">Default</Button>
                    <Button className="cm-btn-text">Text</Button>
                    <Button className="cm-btn-danger" type="danger">
                        Danger
                    </Button>
                </div>
                <div className={styles.blockBox}>
                    <Input className="cm-input" placeholder="Basic usage" />
                </div>
                <div className={styles.blockBox}>
                    <TextArea className="cm-textarea" rows={4} />
                </div>
                <div className={styles.blockBox}>
                    <RadioGroup onChange={this.onChangeRadio} value={this.state.radioValue}>
                        <Radio className="cm-radio" value={1}>
                            A
                        </Radio>
                        <Radio className="cm-radio" value={2}>
                            B
                        </Radio>
                        <Radio className="cm-radio" value={3}>
                            C
                        </Radio>
                        <Radio className="cm-radio" value={4}>
                            D
                        </Radio>
                    </RadioGroup>
                </div>
                <div className={styles.blockBox}>
                    <Switch className="cm-switch" defaultChecked />
                    <br />
                    <Switch size="small" defaultChecked />
                </div>
                <div className={styles.blockBox}>
                    <Checkbox>Checkbox</Checkbox>
                </div>
            </div>
        );
    }
}

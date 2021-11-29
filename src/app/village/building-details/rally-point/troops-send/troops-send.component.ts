import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {MilitaryUnit} from "../military-unit/military-unit.component";

export class AttackModel {
  constructor(public villageName: string, public x: number, public y: number,
              public kindAttack: number, public waves: WaveModels[]) {}
}

export interface WaveModels {
  troops: number[];
  firstTarget: number;
  firstTargetText: string;
  secondTarget: number;
  secondTargetText: string;
}

@Component({
  selector: 'app-troops-send',
  templateUrl: './troops-send.component.html',
  styleUrls: ['./troops-send.component.css', '../../../../shared/combat-units.css']
})
export class TroopsSendComponent implements OnInit, OnDestroy {

  attack: AttackModel = new AttackModel('', 0, 0, 0,  []);

  targets: string[] = ['Random target', 'Random target'];

  attackForm!: FormGroup;
  componentSubs: Subscription[] = [];
  imgSrc = "../../../../../assets/img/x.gif";

  @Input() militaryUnit!: MilitaryUnit;

  constructor() {
    this.attackForm = new FormGroup({
      villageName: new FormControl({value: '', disabled: true}),
      x: new FormControl({value: '', disabled: true}, Validators.required),
      y: new FormControl({value: '', disabled: true}, Validators.required),
      kind: new FormControl({value: '3', disabled: true}),
      u0: new FormControl({value: 0, disabled: true}),
      u1: new FormControl({value: 0, disabled: true}),
      u2: new FormControl({value: 0, disabled: true}),
      u3: new FormControl({value: 0, disabled: true}),
      u4: new FormControl({value: 0, disabled: true}),
      u5: new FormControl({value: 0, disabled: true}),
      u6: new FormControl({value: 0, disabled: true}),
      u7: new FormControl({value: 0, disabled: true}),
      u8: new FormControl({value: 0, disabled: true}),
      u9: new FormControl({value: 0, disabled: true}),
      u10: new FormControl({value: 0, disabled: true}),
      firstTarget: new FormControl({value: '99', disabled: true}),
      secondTarget: new FormControl({value: '99', disabled: true}),
    });
  }

  ngOnInit() {
    this.setEnable();
  }

  private setEnable() {
    this.attackForm.controls.villageName.enable();
    this.attackForm.controls.x.enable();
    this.attackForm.controls.y.enable();
    this.attackForm.controls.kind.enable();
    this.attackForm.controls.u0.enable();
    this.attackForm.controls.u1.enable();
    this.attackForm.controls.u2.enable();
    this.attackForm.controls.u3.enable();
    this.attackForm.controls.u4.enable();
    this.attackForm.controls.u5.enable();
    this.attackForm.controls.u6.enable();
    this.attackForm.controls.u7.enable();
    this.attackForm.controls.u8.enable();
    this.attackForm.controls.u9.enable();
    this.attackForm.controls.u10.enable();
  }

  onChangeTarget(targetNumber: number, event: any) {
    const value = event.target.options.selectedIndex.toString();
    this.targets[targetNumber - 1] = event.target.options[value].text;
  }

  onAddWave() {
    const troops = [+this.attackForm.value.u0, +this.attackForm.value.u1, +this.attackForm.value.u2, +this.attackForm.value.u3,
      +this.attackForm.value.u4, +this.attackForm.value.u5, +this.attackForm.value.u6, +this.attackForm.value.u7,
      +this.attackForm.value.u8, +this.attackForm.value.u9, +this.attackForm.value.u10];

    const summ = troops.reduce((a, b) => a + b, 0);
    if (summ === 0) {
      return;
    }

    this.attack.waves.push({
      troops,
      firstTarget: +this.attackForm.value.firstTarget, firstTargetText: this.targets[0],
      secondTarget: +this.attackForm.value.secondTarget, secondTargetText: this.targets[1]});

    this.militaryUnit.units[0] = +this.militaryUnit.units[0] - +this.attackForm.value.u0;
    this.militaryUnit.units[1] = +this.militaryUnit.units[1] - +this.attackForm.value.u1;
    this.militaryUnit.units[2] = +this.militaryUnit.units[2] - +this.attackForm.value.u2;
    this.militaryUnit.units[3] = +this.militaryUnit.units[3] - +this.attackForm.value.u3;
    this.militaryUnit.units[4] = +this.militaryUnit.units[4] - +this.attackForm.value.u4;
    this.militaryUnit.units[5] = +this.militaryUnit.units[5] - +this.attackForm.value.u5;
    this.militaryUnit.units[6] = +this.militaryUnit.units[6] - +this.attackForm.value.u6;
    this.militaryUnit.units[7] = +this.militaryUnit.units[7] - +this.attackForm.value.u7;
    this.militaryUnit.units[8] = +this.militaryUnit.units[8] - +this.attackForm.value.u8;
    this.militaryUnit.units[9] = +this.militaryUnit.units[9] - +this.attackForm.value.u9;
    this.militaryUnit.units[10] = +this.militaryUnit.units[10] - +this.attackForm.value.u10;

    this.attackForm.patchValue(
      {u0: 0, u1: 0, u2: 0, u3: 0, u4: 0, u5: 0, u6: 0, u7: 0, u8: 0, u9: 0, u10: 0,
        firstTarget: '99', secondTarget: '99'}
    );

    this.targets = ['Random target', 'Random target'];
  }

  onWaveDelete(i: number) {
    this.militaryUnit.units[0] = +this.militaryUnit.units[0] + this.attack.waves[i].troops[0];
    this.militaryUnit.units[1] = +this.militaryUnit.units[1] + this.attack.waves[i].troops[1];
    this.militaryUnit.units[2] = +this.militaryUnit.units[2] + this.attack.waves[i].troops[2];
    this.militaryUnit.units[3] = +this.militaryUnit.units[3] + this.attack.waves[i].troops[3];
    this.militaryUnit.units[4] = +this.militaryUnit.units[4] + this.attack.waves[i].troops[4];
    this.militaryUnit.units[5] = +this.militaryUnit.units[5] + this.attack.waves[i].troops[5];
    this.militaryUnit.units[6] = +this.militaryUnit.units[6] + this.attack.waves[i].troops[6];
    this.militaryUnit.units[7] = +this.militaryUnit.units[7] + this.attack.waves[i].troops[7];
    this.militaryUnit.units[8] = +this.militaryUnit.units[8] + this.attack.waves[i].troops[8];
    this.militaryUnit.units[9] = +this.militaryUnit.units[9] + this.attack.waves[i].troops[9];
    this.militaryUnit.units[10] = +this.militaryUnit.units[10] + this.attack.waves[i].troops[10];
    this.attack.waves.splice(i, 1);
  }

  onSubmit() {
    this.attack = {
      ...this.attack,
      villageName: this.attackForm.value.villageName,
      x: +this.attackForm.value.x,
      y: +this.attackForm.value.y,
      kindAttack: +this.attackForm.value.kind,
      waves: this.attack.waves,
    };

    this.attack.waves = [];
    this.militaryUnit.units = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.attackForm.reset({
      immediately: true,
      date: new Date(),
      x: 0,
      y: 0,
      kind: '3',
      clientId: this.attackForm.value.clientId,
      timeCorrection: 0,
      u21: 0,
      u22: 0,
      u23: 0,
      u24: 0,
      u25: 0,
      u26: 0,
      u27: 0,
      u28: 0,
      u29: 0,
      u30: 0,
      u31: 0,
      firstTarget: '99',
      secondTarget: '99',
    });
  }

  checkAvailableTroops(id: number, inputName: any, amountEvent: any) {
    const amount = +amountEvent.target.value;
    if (amountEvent.target.value == 0) {
      return;
    }
    amount > this.militaryUnit.units[id] ?
      this.attackForm.get('u' + inputName)!.patchValue(this.militaryUnit.units[id]) :
      this.attackForm.get('u' + inputName)!.patchValue(amount);

    /*if (id === 7 && amount >= 1 && +this.attackForm.value.kind === 3) {
      this.attackForm.controls.firstTarget.enable();
    } else if ((id === 7 && amount < 1) || +this.attackForm.value.kind !== 3) {
      this.attackForm.controls.firstTarget.disable();
    }
    if (id === 7 && amount >= 20 && +this.attackForm.value.kind === 3) {
      this.attackForm.controls.secondTarget.enable();
    } else if ((id === 7 && amount < 20) || +this.attackForm.value.kind !== 3) {
      this.attackForm.controls.secondTarget.disable();
    }*/
  }

  onKindChange() {
    if (+this.attackForm.value.kind === 3) {
      this.attackForm.controls.firstTarget.enable();
      this.attackForm.controls.secondTarget.enable();
    } else if (+this.attackForm.value.kind !== 3) {
      this.attackForm.controls.firstTarget.disable();
      this.attackForm.controls.secondTarget.disable();
    }
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  counter(i: number) {
    return new Array(i);
  }
}

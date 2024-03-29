import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {VillageService} from "../../../../services/village.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ConfirmTroopsSendComponent} from "./confirm-troops-send/confirm-troops-send.component";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs/operators";
import {HomeLegion, CombatGroupSendingContract, CombatGroupSendingRequest} from "../rally-point.component";

export enum ECombatUnitMission {
  HOME="Own army",
  BACK="Return to home",
  CAUGHT="Caught",
  ATTACK="Attack",
  RAID="Raid",
  REINFORCEMENT="Reinforcement"
}

@Component({
  selector: 'app-troops-send',
  templateUrl: './troops-send.component.html',
  styleUrls: ['./troops-send.component.css', '../../../../shared/combat-units.css']
})
export class TroopsSendComponent implements OnInit, OnDestroy {

  @Input() homeLegion!: HomeLegion;
  @Output() confirmClick = new EventEmitter<string>();

  bsModalRef?: BsModalRef;

  attack: CombatGroupSendingRequest = new CombatGroupSendingRequest('', 0, 0, 'REINFORCEMENT',  []);

  targets: string[] = ['Random target', 'Random target'];
  attackForm!: FormGroup;
  componentSubs: Subscription[] = [];

  imgSrc = "../../../../../assets/img/x.gif";

  constructor(private villageService: VillageService,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
    this.attackForm = new FormGroup({
      villageId: new FormControl({value: ''}),
      x: new FormControl({value: this.route.snapshot.queryParams.x, disabled: true}, Validators.required),
      y: new FormControl({value: this.route.snapshot.queryParams.y, disabled: true}, Validators.required),
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

    this.homeLegion.units[0] = +this.homeLegion.units[0] - +this.attackForm.value.u0;
    this.homeLegion.units[1] = +this.homeLegion.units[1] - +this.attackForm.value.u1;
    this.homeLegion.units[2] = +this.homeLegion.units[2] - +this.attackForm.value.u2;
    this.homeLegion.units[3] = +this.homeLegion.units[3] - +this.attackForm.value.u3;
    this.homeLegion.units[4] = +this.homeLegion.units[4] - +this.attackForm.value.u4;
    this.homeLegion.units[5] = +this.homeLegion.units[5] - +this.attackForm.value.u5;
    this.homeLegion.units[6] = +this.homeLegion.units[6] - +this.attackForm.value.u6;
    this.homeLegion.units[7] = +this.homeLegion.units[7] - +this.attackForm.value.u7;
    this.homeLegion.units[8] = +this.homeLegion.units[8] - +this.attackForm.value.u8;
    this.homeLegion.units[9] = +this.homeLegion.units[9] - +this.attackForm.value.u9;
    this.homeLegion.units[10] = +this.homeLegion.units[10] - +this.attackForm.value.u10;

    this.attackForm.patchValue(
      {u0: 0, u1: 0, u2: 0, u3: 0, u4: 0, u5: 0, u6: 0, u7: 0, u8: 0, u9: 0, u10: 0,
        firstTarget: '99', secondTarget: '99'}
    );

    this.targets = ['Random target', 'Random target'];
  }

  onWaveDelete(i: number) {
    this.homeLegion.units[0] = +this.homeLegion.units[0] + this.attack.waves[i].troops[0];
    this.homeLegion.units[1] = +this.homeLegion.units[1] + this.attack.waves[i].troops[1];
    this.homeLegion.units[2] = +this.homeLegion.units[2] + this.attack.waves[i].troops[2];
    this.homeLegion.units[3] = +this.homeLegion.units[3] + this.attack.waves[i].troops[3];
    this.homeLegion.units[4] = +this.homeLegion.units[4] + this.attack.waves[i].troops[4];
    this.homeLegion.units[5] = +this.homeLegion.units[5] + this.attack.waves[i].troops[5];
    this.homeLegion.units[6] = +this.homeLegion.units[6] + this.attack.waves[i].troops[6];
    this.homeLegion.units[7] = +this.homeLegion.units[7] + this.attack.waves[i].troops[7];
    this.homeLegion.units[8] = +this.homeLegion.units[8] + this.attack.waves[i].troops[8];
    this.homeLegion.units[9] = +this.homeLegion.units[9] + this.attack.waves[i].troops[9];
    this.homeLegion.units[10] = +this.homeLegion.units[10] + this.attack.waves[i].troops[10];
    this.attack.waves.splice(i, 1);
  }

  onSubmit() {
    this.attack = {
      ...this.attack,
      villageId: this.homeLegion.villageId,
      x: +this.attackForm.value.x,
      y: +this.attackForm.value.y,
      mission: +this.attackForm.value.kind === 2 ? 'REINFORCEMENT': +this.attackForm.value.kind === 3 ? 'ATTACK' : 'RAID',
      waves: this.attack.waves,
    };

    this.villageService.checkTroopsSendingRequest(this.attack).subscribe(response => {
      this.openModalWithComponent(response);
    }, error => {
      console.log(error.error);
    });
  }

  checkAvailableTroops(id: number, inputName: any, amountEvent: any) {
    const amount = +amountEvent.target.value;
    if (amountEvent.target.value == 0) {
      return;
    }
    amount > this.homeLegion.units[id] ?
      this.attackForm.get('u' + inputName)!.patchValue(this.homeLegion.units[id]) :
      this.attackForm.get('u' + inputName)!.patchValue(amount);

    if (id === 7 && amount >= 1 && +this.attackForm.value.kind === 3) {
      this.attackForm.controls.firstTarget.enable();
    } else if ((id === 7 && amount < 1) || +this.attackForm.value.kind !== 3) {
      this.attackForm.controls.firstTarget.disable();
    }
    if (id === 7 && amount >= 20 && +this.attackForm.value.kind === 3) {
      this.attackForm.controls.secondTarget.enable();
    } else if ((id === 7 && amount < 20) || +this.attackForm.value.kind !== 3) {
      this.attackForm.controls.secondTarget.disable();
    }
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

  resetForm(){
    this.attack.waves = [];
    /*this.militaryUnit.units = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];*/
    this.attackForm.reset({
      x: '', y: '',
      kind: '3',
      u0: 0,
      u1: 0,
      u2: 0,
      u3: 0,
      u4: 0,
      u5: 0,
      u6: 0,
      u7: 0,
      u8: 0,
      u9: 0,
      u10: 0,
      firstTarget: '99',
      secondTarget: '99',
    });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  openModalWithComponent(militaryUnitContract: CombatGroupSendingContract) {
    const initialState: ModalOptions = {
      initialState: {
        militaryUnitContract: militaryUnitContract,
        title: 'Confirm sending ',
        position: this.route.snapshot.params['position']
      }
    };
    this.bsModalRef = this.modalService.show(ConfirmTroopsSendComponent, initialState);
    this.bsModalRef.onHide?.pipe(take(1)).subscribe((reason: string | any) => {
      if (reason === 'confirm'){
        this.confirmSending(militaryUnitContract);
      }
      if (reason === 'cancel'){
        this.cancelSending();
      }
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  private cancelSending() {
    this.bsModalRef?.hide();
    for (let i = 0; i < this.attack.waves.length; i++) {
      this.onWaveDelete(i);
    }
    this.resetForm();
  }

  private confirmSending(militaryUnit: CombatGroupSendingContract) {
    this.villageService.sendConfirmedTroops(militaryUnit).subscribe(result => {
      this.bsModalRef?.hide();
      this.resetForm();
      this.confirmClick.emit('confirm');
    }, error => {
      console.log('Error: ', error);
    });
  }
}

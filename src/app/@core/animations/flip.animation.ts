import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from "@angular/animations";


export class FlipAnimation {
    static animations = FlipAnimation.getAnimations();

    static getAnimations(): Array<AnimationTriggerMetadata> {
        return [
            trigger('flipState', [
                state(
                    'active',
                    style({
                        transform: 'rotateY(180deg)',
                    })
                ),
                state(
                    'inactive',
                    style({
                        transform: 'rotateY(0)',
                    })
                ),
                transition('active => inactive', animate('400ms ease-out')),
                transition('inactive => active', animate('400ms ease-in')),
            ]),
        ];
    }
}
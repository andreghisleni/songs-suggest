import { FilterInput, FilterSchema } from '@/filter-input';
import { Public } from '@/shared/auth/public.decorator';
import { CheckPoliciesApp } from '@/shared/casl/policies.types';
import { PubSubService } from '@/shared/subscription/pubSub.service';
import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ZodArgs } from 'nestjs-graphql-zod';

import { Event } from './entities/event.entity';
import { EventsService } from './events.service';

// const pubSub = new PubSub();

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private readonly pubSub: PubSubService,
  ) {}

  @Public()
  @Subscription(() => Event, {
    resolve: (value: Event) => value,
    filter: (payload, variables) => {
      return !(variables.ids as string[]).includes(payload.id);
    },
  })
  eventUpdated(@Args('ids', { type: () => [String] }) id: string[]) {
    return this.pubSub.asyncIterableIterator('eventUpdated');
  }

  @CheckPoliciesApp(a => a.can('get-all', 'Event'))
  @Query(() => [Event], { name: 'events' })
  findAll(
    @ZodArgs(FilterSchema, 'filter', {
      name: 'FilterInput',
      description: 'Filtered a event',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterInput,
  ) {
    return this.eventsService.findAll(filter);
  }

  @CheckPoliciesApp(a => a.can('get-all', 'Event'))
  @Query(() => Number)
  getTotalEvents(
    @ZodArgs(FilterSchema, 'filter', {
      name: 'FilterInput',
      description: 'Filtered a event',
      nullable: true,
      defaultValue: {},
    })
    filter: FilterInput,
  ) {
    return this.eventsService.findTotalEvents(filter);
  }

  @CheckPoliciesApp(a => a.can('get', 'Event'))
  @Query(() => Event, { name: 'event' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.eventsService.findById(id);
  }

  // @Public()
  // @Query(() => Event, { name: 'eventByShortId' })
  // findByShortId(@Args('shortId', { type: () => String }) shortId: string) {
  //   return this.eventsService.findByShortId(shortId);
  // }

  // // @Public()
  // // @Query(() => ExternalEvent, { name: 'eventByExternalId' })
  // // findByExternalId(@Args('externalId', { type: () => String }) externalId: string) {
  // //   return this.eventsService.findByExternalId(externalId);
  // // }

  // @CheckPoliciesApp(a => a.can('create', 'Closing'))
  // @Mutation(() => Closing)
  // async downloadEventData(
  //   @Args('externalId', { type: () => String }) externalId: string,
  //   @Args('phone', { type: () => String, nullable: true }) phone: string,
  // ) {
  //   return this.eventsService.createOne(externalId, phone);
  // }

  // @CheckPoliciesApp(a => a.can('create', 'Closing'))
  // @Mutation(() => Event)
  // async reprocess(
  //   @Args('id', { type: () => String }) id: string,
  //   @Args('phone', { type: () => String, nullable: true }) phone: string,
  // ) {
  //   return this.eventsService.reprocess(id, phone);
  // }

  // @ResolveField()
  // closing(@Parent() { id }: Event) {
  //   return this.eventsService.closing(id);
  // }

  // @ResolveField()
  // payments(@Parent() { id }: Event) {
  //   return this.eventsService.payments(id);
  // }
}
